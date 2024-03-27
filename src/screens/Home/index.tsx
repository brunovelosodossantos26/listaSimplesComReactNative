import React from "react";
import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from "react-native";
import { Participant } from "../../components/Participant";

import { styles } from "./style";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd() {

    if (!participantName.trim()) {
      return Alert.alert("Erro", "Digite um nome.")
    }

    if (participants.includes(participantName)) {
      return Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome.");
    }
    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {


    Alert.alert("Remover", `Remover o participante ${name}?`, [{
      text: 'Sim',
      onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
    },
    {
      text: 'Não',
      style: 'cancel'
    }
    ]);

  }

  function handleState(value: string) {
    setParticipantName(value)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Quarta, 27 de março de 2024.
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />

    </View>
  )
}